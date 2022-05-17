import { KingdomState } from 'state';
import { useAppSelector } from './useAppSelector';

export const useKingdom = (): KingdomState => useAppSelector((state) => state.kingdom);
