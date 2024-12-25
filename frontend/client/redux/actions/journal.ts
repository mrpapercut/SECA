export const JOURNAL_SET_ROUTE = 'JOURNAL_SET_ROUTE';
export const setJournalRoute = (route: NavRoute.Route) => ({
    type: JOURNAL_SET_ROUTE,
    payload: route
});
