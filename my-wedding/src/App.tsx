import HeroSection from './components/HeroSection';
import QuoteSection from './components/QuoteSection';
import FamilySection from './components/FamilySection';
import EventDetails from './components/EventDetails';
import CalendarSection from './components/CalendarSection';
import LocationSection from './components/LocationSection';
import AlbumSection from './components/AlbumSection';
import RSVPSection from './components/RSVPSection';
import MusicPlayer from './components/MusicPlayer';
import AutoScroll from './components/AutoScroll';
import data from './data.json';

function App() {
  return (
    <div className="app-container">
      <HeroSection data={data} />
      <QuoteSection />
      <FamilySection data={data} />
      <EventDetails data={data} />
      <CalendarSection data={data} />
      <LocationSection data={data} />
      <AlbumSection data={data} />
      <RSVPSection data={data} />
      <MusicPlayer />
      <AutoScroll />
    </div>
  );
}

export default App;
