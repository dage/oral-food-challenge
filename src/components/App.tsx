import './App.scss';
import { Provider } from 'react-redux';
import store  from '../redux/store';
import DailyLog from './DailyLog';

const App = () => {
    return (
        <Provider store={store}>
            <DailyLog />
        </Provider>
    );
}

export default App;