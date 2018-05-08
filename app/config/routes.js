import {StackNavigator} from 'react-navigation';

import PitchSimulator from '../screens/PitchSimulator';


const Navigator = StackNavigator({
        PitchSimulator: {
            screen: PitchSimulator,
            navigationOptions: {
                title: 'Football Simulator',
                //header: null
            },
        }

    }
);

export default Navigator;