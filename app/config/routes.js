import {StackNavigator} from 'react-navigation';

import PitchSimulator from '../screens/PitchSimulator';


const Navigator = StackNavigator({
        PitchSimulator: {
            screen: PitchSimulator,
            navigationOptions: {
                title: 'Simulate',
                //header: null
            },
        }

    }
);

export default Navigator;