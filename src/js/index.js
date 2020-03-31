import 'bootstrap';
import Aos from 'aos';
import './nav/toggleNav';
import './nav/toggleNavSelects';

Aos.init({
  offset: 120,
  delay: 100,
  duration: 600,
  disable: 'mobile',
});
