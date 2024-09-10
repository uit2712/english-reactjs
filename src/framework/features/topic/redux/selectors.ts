import { useSelector } from 'react-redux';
import { getListTopics } from './slice';

export function useGetListTopics() {
    return useSelector(getListTopics);
}
