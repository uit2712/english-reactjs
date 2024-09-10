import { useSelector } from 'react-redux';
import { getListGroups } from './slice';

export function useGetListGroups() {
    return useSelector(getListGroups);
}
