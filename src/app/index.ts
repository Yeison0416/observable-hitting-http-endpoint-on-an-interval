import 'reset-css';
import './index.scss';
import { HttpPolling } from './http-polling/http-polling';

function application() {
    return {
        run() {
            const appRootElement: HTMLElement = document.getElementById('app-root')! as HTMLElement;
            const httpPolling = HttpPolling(appRootElement);
            httpPolling.start();
        },
    };
}

const app = application();
app.run();
