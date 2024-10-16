import {
    RouteRepositoryInteface
} from '@/core/features/navigator/interface-adapters/RouteRepositoryInteface';
import { StringHelper } from '@/core/helpers/StringHelper';

export class RouteRepository implements RouteRepositoryInteface {
    private data?: any;
    private query?: any;

    setRouteData(data?: any): void {
        this.data = data;
    }

    setRouteQueryData(data?: any): void {
        this.query = data;
    }

    getPathParamAsString(name: string, defaultValue?: string): string {
        throw new Error('Method not implemented.');
    }

    getPathParamAsNumber(name: string, defaultValue?: number): number {
        throw new Error('Method not implemented.');
    }

    getQueryParamAsString(name: string, defaultValue: string = ''): string {
        if (!this.query || StringHelper.isHasValue(name) === false) {
            return defaultValue;
        }

        const value = this.query[name];
        return typeof value === 'string' ? value : defaultValue;
    }

    getQueryParamAsNumber(name: string, defaultValue: number = -1): number {
        if (!this.query || StringHelper.isHasValue(name) === false) {
            return defaultValue;
        }

        const value = this.query[name];
        return typeof value === 'string' ? Number.parseInt(value) : defaultValue;
    }

    getRouteDataAsString(name: string, defaultValue: string = ''): string {
        if (!this.data) {
            return defaultValue;
        }

        const value = this.data[name];
        return value ? value : defaultValue;
    }

    getRouteDataAsNumber(name: string, defaultValue: number = 0): number {
        if (!this.data) {
            return defaultValue;
        }

        const value = this.data[name];
        return value ? Number.parseInt(value) : defaultValue;
    }
}
