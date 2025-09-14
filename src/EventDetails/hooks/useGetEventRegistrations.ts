import type { TableFilter } from "@/UsersPage/store/types";
import { useStore } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Registration } from "../store/types.ts";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export type EventRegistrationsResponse = {
	paginatedResult: Registration[];
	totalCount: number;
};

const take = 10;
const getEventRegistrations = async (
	pageParam: number,
	filters: TableFilter[],
	axiosPrivate: AxiosInstance,
	eventId?: string
): Promise<EventRegistrationsResponse> => {
	let where = filters
		.filter((filter) => {
			// Remove 'keyword' filter if both 'keyword' and 'radio' are present
			if (
				filter.filterKey === "keyword" &&
				filters.some((f) => f.filterKey === "radio" && f.optionName === filter.optionName)
			) {
				return false;
			}
			// Exclude 'order' filters
			return filter.filterKey !== "order";
		})
		.map((filter) =>
			filter?.customFilter
				? filter.customFilter
				: `where[${filter.optionName}][contains]=${encodeURIComponent(filter.filterValue)}&where[${filter.optionName}][mode]=insensitive`
		)
		.join("&");
	let orderBy = filters
		.filter((filter) => filter.filterKey === "order")
		.map((filter) =>
			filter?.customOrder
				? filter.customOrder
				: `orderBy[${filter.optionName}]=${filter.filterValue}`
		)
		.join("&");
	if (eventId) {
		where = `where[eventId]=${eventId}` + (where ? `&${where}` : "");
	}
	if (!orderBy) {
		orderBy = "orderBy[createdAt]=asc";
	}
	const response = await axiosPrivate.get(
		`/registration?skip=${pageParam * take}&take=${take}&${where}&${orderBy}`
	);
	return response.data;
};
const useGetEventRegistrations = (
	eventId?: string,
	options?: { filters?: TableFilter[]; enabled: boolean }
) => {
	const filters = useStore((state) => state.user.tableFilters).registration;
	const mergedFilters = [...(filters || []), ...(options?.filters || [])];
	const setRegistrations = useStore((state) => state.registration.setRegistrations);
	const axiosPrivate = useAxiosPrivate();
	const registrationsQuery = useInfiniteQuery({
		queryKey: ["registrations", mergedFilters, axiosPrivate, eventId],
		queryFn: ({ pageParam = 0 }) => {
			return getEventRegistrations(pageParam, mergedFilters, axiosPrivate, eventId);
		},
		enabled: options?.enabled,
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			const pageNumbers = Math.ceil(lastPage.totalCount / take);
			const currentPage = allPages.length;
			if (currentPage < pageNumbers) {
				return currentPage;
			}
			return undefined;
		},
	});

	useEffect(() => {
		if (registrationsQuery.data) {
			setRegistrations(registrationsQuery.data.pages.map((page) => page.paginatedResult).flat());
		}
	}, [registrationsQuery.data]);
	return registrationsQuery;
};

export default useGetEventRegistrations;
