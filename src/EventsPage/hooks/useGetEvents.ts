import type { TableFilter } from "@/UsersPage/store/types";
import { useStore } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Event } from "../store/types";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export type EventsResponse = {
	paginatedResult: Event[];
	totalCount: number;
};

const take = 10;
const getEvents = async (
	pageParam: number,
	filters: TableFilter[],
	searchFilter: string,
	axiosPrivate: AxiosInstance
): Promise<EventsResponse> => {
	const where = filters
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
	if (!orderBy) {
		orderBy = "orderBy[createdAt]=asc";
	}
	const searchQuery = searchFilter
		? `&where[OR][0][name][contains]=${encodeURIComponent(searchFilter)}&where[OR][0][name][mode]=insensitive` +
			`&where[OR][1][description][contains]=${encodeURIComponent(searchFilter)}&where[OR][1][description][mode]=insensitive` +
			`&where[OR][2][location][contains]=${encodeURIComponent(searchFilter)}&where[OR][2][location][mode]=insensitive`
		: "";
	const response = await axiosPrivate.get(
		`/event?skip=${pageParam * take}&take=${take}&${where}&${orderBy}${searchQuery}`
	);
	return response.data;
};
const useGetEvents = (options?: { filters?: TableFilter[]; enabled: boolean }) => {
	const filters = useStore((state) => state.user.tableFilters).event;
	const mergedFilters = [...(filters || []), ...(options?.filters || [])];
	const setEvents = useStore((state) => state.event.setEvents);
	const searchFilter = useStore((state) => state.event.searchFilter);
	const axiosPrivate = useAxiosPrivate();
	const eventsQuery = useInfiniteQuery({
		queryKey: ["events", mergedFilters, searchFilter, axiosPrivate],
		queryFn: ({ pageParam = 0 }) => {
			return getEvents(pageParam, mergedFilters, searchFilter, axiosPrivate);
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
		if (eventsQuery.data) {
			setEvents(eventsQuery.data.pages.map((page) => page.paginatedResult).flat());
		}
	}, [eventsQuery.data]);
	return eventsQuery;
};

export default useGetEvents;
