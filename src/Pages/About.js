import Contact from '../Components/About/Contact.jsx';
import IntroAbout from '../Components/About/IntroAbout.jsx';
import SliderComments from '../Components/About/SliderComments.jsx';

export default function About() {
    return (
        <div>
            <IntroAbout />
            <SliderComments/>
            <Contact/>
        </div>
    );
}