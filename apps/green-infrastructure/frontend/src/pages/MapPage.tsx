import SampleMap from '../components/map/SampleMap';
import Header from '../pages/Header';


export default function MapPage() {

  return (
    <div>
        <Header />
        {/* <Welcome />
        <Divider /> */}
       
        <SampleMap zoom={8}/>
        <div></div>

      {/* <Divider />
      <About /> */}
    </div>
  );
};
