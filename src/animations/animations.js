import Radium, {StyleRoot} from 'radium';
import { fadeInDown, fadeInUp, fadeIn, bounceIn } from 'react-animations';

export const animations = {
  fadeInDown: {
    animation: 'x 0.8s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  },
  fadeInUp: {
    animation: 'x 0.8s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
  },
  fadeIn: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  bounceIn: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(bounceIn, 'bounceIn')
  }

}
