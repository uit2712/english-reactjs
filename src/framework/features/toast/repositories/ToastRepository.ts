import { StringHelper } from '@/core/helpers/StringHelper';
import { ToastRepositoryInteface } from '@/core/features/toast/interface-adapters/ToastRepositoryInteface';
import { toast } from 'react-toastify';

export class ToastRepository implements ToastRepositoryInteface {
    showSuccessMessage(message: string): void {
        if (StringHelper.isHasValue(message) === false) {
            return;
        }

        toast.success(message);
    }

    showErrorMessage(message: string): void {
        if (StringHelper.isHasValue(message) === false) {
            return;
        }

        toast.error(message);
    }

    showSuccessMessageAutoClose(message: string, lifespan: number): void {
        if (StringHelper.isHasValue(message) === false) {
            return;
        }

        toast.success(message, {
            delay: lifespan,
        });
    }

    showErrorMessageAutoClose(message: string, lifespan: number): void {
        if (StringHelper.isHasValue(message) === false) {
            return;
        }

        toast.error(message, {
            delay: lifespan,
        });
    }
}
