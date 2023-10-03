import styled from 'styled-components';
import { Image } from 'antd';
import { useState } from 'react';
import { SITE_STATUS_ROADMAP, SITE_TYPE_ROADMAP } from '../../constants';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Collapse } from '@mui/material';
import generateCircleSVG from '../../images/markers/circle';
import generateDiamondSVG from '../../images/markers/diamond';
import generateSquareSVG from '../../images/markers/square';
import generateStarSVG from '../../images/markers/star';
import generateTriangleSVG from '../../images/markers/triangle';

const MapLegendContainer = styled.div<{ isVisible: boolean }>`
  background: #BDBDBD;
  width: 435px;             
  gap: 20px;
  position: relative;
  transition: height 0.3s ease;
  min-height: ${(props) => (props.isVisible ? '20px' : 'auto')};
  height: ${(props) => (props.isVisible ? '419px' : 'auto')};
  overflow: hidden;
`;

const LegendItem = styled.div`
  width: 100%;
  display: flex;
  gap: 0 40px;
  align-items: center;
`;


const LegendImage = styled(Image)`
  height: 20px;
  width: 20px;
  justify-content: center;
  display: inline-block;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? '#e74c3c' : '#3498db')};
  height: 38px;
  width: 370px;
  color: #fff;
  border: line;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  align-items: center;
  display: flex;
`;


const ToggleButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  bottom: 1px;
  left: 200px;
  position: absolute;
  z-index: 1;
`;


const CaretDownStyled = styled(CaretDownOutlined)`
  color: #FFFFFF;
`;

const CaretUpStyled = styled(CaretUpOutlined)`
  color: #FFFFFF;
`;

interface MapLegendProps {
  selectedFeatures: string[];
  setSelectedFeatures: any;
  selectedStatuses: string[];
  setSelectedStatuses: any;
  icons: string[] | null; 
}

const MapLegend: React.FC<MapLegendProps> = ({ selectedFeatures, setSelectedFeatures, selectedStatuses, setSelectedStatuses, icons }) => {
    const [isVisible, setIsVisible] = useState(true);


    const toggleShowLegend = () => {
        setIsVisible((prev) => !prev);
      };

    const [availableIcon, adoptedIcon, futureIcon] =
      icons ?? SITE_STATUS_ROADMAP.map((option) => option.image);

    const [circleIcon, diamondIcon, squareIcon, starIcon, triangleIcon] =
      icons ?? SITE_TYPE_ROADMAP.map((option) => option.image);



      const handleFeatureClick = (icon: string) => {
        // Check if the icon is already selected
        const isAlreadySelected = selectedFeatures.includes(icon);
    
        if (isAlreadySelected) {
          // Deselect the icon
          setSelectedFeatures((prevSelectedFeatures: string []) =>
            prevSelectedFeatures.filter((selected) => selected !== icon)
          );
        } else {
          // Select the icon
          setSelectedFeatures((prevSelectedFeatures: string []) => [...prevSelectedFeatures, icon]);
        }
      };

      const handleStatusClick = (icon: string) => {
        // Check if the icon is already selected
        const isAlreadySelected = selectedStatuses.includes(icon);
    
        if (isAlreadySelected) {
          // Deselect the icon
          setSelectedStatuses((prevSelectedStatuses: string []) =>
            prevSelectedStatuses.filter((selected) => selected !== icon)
          );
        } else {
          // Select the icon
          setSelectedStatuses((prevSelectedStatuses: string []) => [...prevSelectedStatuses, icon]);
        }
      };

    return (

      <Collapse collapsedSize={28} in={isVisible}>
      <ToggleButton onClick={toggleShowLegend}>
        {isVisible ? <CaretDownStyled /> : <CaretUpStyled />}
      </ToggleButton>
      <MapLegendContainer isVisible={isVisible}>
      <h1>Feature Type</h1>

      <LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('Bioretention')} 
      isSelected={selectedFeatures.includes('Bioretention')} 
    >
      <LegendImage src={generateCircleSVG('grey')} alt="Circle" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Bioretention
    </StyledButton>
  )}
</LegendItem>

<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('Bioswale')} 
      isSelected={selectedFeatures.includes('Bioswale')} 
    >
      <LegendImage src={generateDiamondSVG('grey')} alt="Diamond" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Bioswale
    </StyledButton>
  )}
</LegendItem>

<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('Porous Paving')} 
      isSelected={selectedFeatures.includes('Porous Paving')} 
    >
      <LegendImage src={generateSquareSVG('grey')} alt="Square" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Porous Paving
    </StyledButton>
  )}
</LegendItem>


<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('Tree Trench/Pit')} 
      isSelected={selectedFeatures.includes('Tree Trench/Pit')} 
    >
      <LegendImage src={starIcon} alt="Star" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Tree Trench/Pit
    </StyledButton>
  )}
</LegendItem>


<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('Rain Garden')} 
      isSelected={selectedFeatures.includes('Rain Garden')} 
    >
      <LegendImage src={generateTriangleSVG('grey')} alt="Triangle" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Rain Garden
    </StyledButton>
  )}
</LegendItem>

<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('Green Roof/Planter')} 
      isSelected={selectedFeatures.includes('Green Roof/Planter')} 
    >
      <LegendImage src={generateTriangleSVG('grey')} alt="Triangle" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Green Roof/Planter
    </StyledButton>
  )}
</LegendItem>

      <LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleStatusClick('Available')} 
      isSelected={selectedStatuses.includes('Available')} 
    >
      <LegendImage src={availableIcon} alt="Available" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Available
    </StyledButton>
  )}
</LegendItem>
<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleStatusClick('Adopted')} 
      isSelected={selectedStatuses.includes('Adopted')} 
    >
      <LegendImage src={adoptedIcon} alt="Adopted" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Adopted
    </StyledButton>
  )}
</LegendItem>
  </MapLegendContainer>
  </Collapse>
  );
};



export default MapLegend;

