import styled from 'styled-components';


const MapLegendContainer = styled.div`
  background: #BDBDBD;
  width: 435px;
  height: 419px;
  left: 845px;
  gap: 20px;
`;


const MapLegend = ({}) => {
    return (
        <MapLegendContainer>
            <h1>Feature Type</h1>
        </MapLegendContainer>
      );
    };


export default MapLegend;