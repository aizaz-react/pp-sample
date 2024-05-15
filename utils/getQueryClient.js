import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';
import { queryClientOptions } from './constants';

const getQueryClient = cache(() => new QueryClient(queryClientOptions));
export default getQueryClient;
