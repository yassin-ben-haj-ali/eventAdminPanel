import type { TableFilter } from "@/UsersPage/store/types";
import { useStore } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { User } from "../store/types";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export type UsersResponse = {
	paginatedResult: User[];
	totalCount: number;
};

const take = 10;
const getUsers = async (
	pageParam: number,
	filters: TableFilter[],
	searchFilter: string,
	axiosPrivate: AxiosInstance
): Promise<UsersResponse> => {
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
		? `&where[OR][0][firstName][contains]=${encodeURIComponent(searchFilter)}&where[OR][0][firstName][mode]=insensitive` +
			`&where[OR][1][lastName][contains]=${encodeURIComponent(searchFilter)}&where[OR][1][lastName][mode]=insensitive` +
			`&where[OR][2][mailAdress][contains]=${encodeURIComponent(searchFilter)}&where[OR][2][mailAdress][mode]=insensitive`
		: "";
	const response = await axiosPrivate.get(
		`/user?skip=${pageParam * take}&take=${take}&${where}&${orderBy}${searchQuery}`
	);
	return response.data;
};
const useGetUsers = (options?: { filters?: TableFilter[]; enabled: boolean }) => {
	const filters = useStore((state) => state.user.tableFilters).user;
	const mergedFilters = [...(filters || []), ...(options?.filters || [])];
	const setUsers = useStore((state) => state.user.setUsers);
	const searchFilter = useStore((state) => state.user.searchFilter);
	const axiosPrivate = useAxiosPrivate();
	const usersQuery = useInfiniteQuery({
		queryKey: ["users", mergedFilters, searchFilter, axiosPrivate],
		queryFn: ({ pageParam = 0 }) => {
			return getUsers(pageParam, mergedFilters, searchFilter, axiosPrivate);
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
		if (usersQuery.data) {
			setUsers(usersQuery.data.pages.map((page) => page.paginatedResult).flat());
		}
	}, [usersQuery.data]);
	return usersQuery;
};

export default useGetUsers;
