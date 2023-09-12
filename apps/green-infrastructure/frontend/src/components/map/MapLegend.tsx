import styled, { css } from 'styled-components';
import { Button, Typography, Image, Checkbox } from 'antd';
import { useState } from 'react';
import { SITE_STATUS_ROADMAP, SITE_TYPE_ROADMAP } from '../../constants';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const MapLegendContainer = styled.div`
  background: #BDBDBD;
  width: 435px;
  height: 419px;
  left: 845px;
  gap: 20px;
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
`;


const CollapsibleContainer = styled.div<{ isCollapsed: boolean }>`
  height: ${(props) => (props.isCollapsed ? '0' : 'auto')};
  overflow: hidden;
  transition: height 0.3s ease;
`;

const ToggleButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  bottom: 5px;
  left: 200px;
`;


const CaretDownStyled = styled(CaretDownOutlined)`
  color: #FFFFFF;
`;

const CaretUpStyled = styled(CaretUpOutlined)`
  color: #FFFFFF;
`;

interface MapLegendProps {
  icons: string[] | null; 
}

const MapLegend: React.FC<MapLegendProps> = ({ icons }) => {
    const [showLegend, setShowLegend] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const toggleShowLegend = () => {
        setShowLegend((prevState) => !prevState);
      };

    const [availableIcon, adoptedIcon, futureIcon] =
      icons ?? SITE_STATUS_ROADMAP.map((option) => option.image);

    console.log(icons)


    const handleFeatureClick = (icon: string) => {
      // Check if the icon is already selected
      const isAlreadySelected = selectedFeatures.includes(icon);
  
      if (isAlreadySelected) {
        // Deselect the icon
        setSelectedFeatures((prevSelectedFeatures) =>
          prevSelectedFeatures.filter((selected) => selected !== icon)
        );
      } else {
        // Select the icon
        setSelectedFeatures((prevSelectedFeatures) => [...prevSelectedFeatures, icon]);
      }
    };

    

    return (
      <MapLegendContainer>
        <CollapsibleContainer isCollapsed={showLegend}>
      <h1>Feature Type</h1>
      <LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('availableIcon')} 
      isSelected={selectedFeatures.includes('availableIcon')} 
    >
      <LegendImage src={availableIcon} alt="Available" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Available
    </StyledButton>
  )}
</LegendItem>
<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('adoptedIcon')} 
      isSelected={selectedFeatures.includes('adoptedIcon')} 
    >
      <LegendImage src={adoptedIcon} alt="Adopted" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Adopted
    </StyledButton>
  )}
</LegendItem>
<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('futureIcon')} 
      isSelected={selectedFeatures.includes('futureIcon')} 
    >
      <LegendImage src={futureIcon} alt="Future" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Future
    </StyledButton>
  )}
</LegendItem>
<ToggleButton onClick={toggleShowLegend}>
        {showLegend ? <CaretDownStyled /> : <CaretUpStyled />}
      </ToggleButton>
</CollapsibleContainer>
  </MapLegendContainer>
  );
};


export default MapLegend;