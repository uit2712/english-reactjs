import { RouteRepositoryInteface } from '@/core/features/navigator/interface-adapters/RouteRepositoryInteface';
import { StringHelper } from '@/core/helpers/StringHelper';
import { Location } from 'react-router-dom';

export class RouteRepository implements RouteRepositoryInteface<Location> {
    private route?: Location;

    setRoute(route: Location<any>): void {
        this.route = route;
    }

    getPathParamAsString(name: string, defaultValue?: string): string {
        throw new Error('Method not implemented.');
    }

    getPathParamAsNumber(name: string, defaultValue?: number): number {
        throw new Error('Method not implemented.');
    }

    getQueryParamAsString(name: string, defaultValue: string = ''): string {
        if (!this.route || StringHelper.isHasValue(name) === false) {
            return defaultValue;
        }

        const value = this.route.state[name];
        return typeof value === 'string' ? value : defaultValue;
    }

    getQueryParamAsNumber(name: string, defaultValue: number = -1): number {
        if (!this.route || StringHelper.isHasValue(name) === false) {
            return defaultValue;
        }

        const value = this.route.state[name];
        return typeof value === 'string' ? Number.parseInt(value) : defaultValue;
    }
}
