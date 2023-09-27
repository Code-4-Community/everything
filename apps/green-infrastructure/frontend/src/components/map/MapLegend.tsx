import styled from 'styled-components';
import { Image } from 'antd';
import { useCallback, useState } from 'react';
import { SITE_STATUS_ROADMAP, SITE_TYPE_ROADMAP } from '../../constants';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Collapse } from '@mui/material';




const MapLegendContainer = styled.div<{ isVisible: boolean }>`
  background: #BDBDBD;
  width: 435px;             
  gap: 20px;
  position: relative;
  transition: height 0.3s ease;
  min-height: ${(props) => (props.isVisible ? '20px' : 'auto')};
  height: 419px;
  overflow: hidden;
`;

const MapLegendToggleContainer = styled.div<{ isVisible: boolean }>`
  background: #BDBDBD;
  width: 435px;
  height: ${(props) => (props.isVisible ? 'auto' : '35px')};
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
  display: flex;
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
  selectedFeatures: string[];
  setSelectedFeatures: any;
  icons: string[] | null; 
}

const MapLegend: React.FC<MapLegendProps> = ({ selectedFeatures, setSelectedFeatures, icons }) => {
    const [isVisible, setIsVisible] = useState(true);


    const toggleShowLegend = () => {
        setIsVisible((prev) => !prev);
      };

    const [availableIcon, adoptedIcon, futureIcon] =
      icons ?? SITE_STATUS_ROADMAP.map((option) => option.image);

    const [rainIcon, swaleIcon, bioretentionIcon, porousIcon, treeIcon] =
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

    

    return (
      <>
      <Collapse in={isVisible}>
      <MapLegendContainer isVisible={isVisible}>
      <h1>Feature Type</h1>

      <LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('rainIcon')} 
      isSelected={selectedFeatures.includes('rainIcon')} 
    >
      <LegendImage src={rainIcon} alt="Rain" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Rain
    </StyledButton>
  )}
</LegendItem>

<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('swaleIcon')} 
      isSelected={selectedFeatures.includes('swaleIcon')} 
    >
      <LegendImage src={rainIcon} alt="Swale" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Swale
    </StyledButton>
  )}
</LegendItem>

<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('bioretentionIcon')} 
      isSelected={selectedFeatures.includes('bioretentionIcon')} 
    >
      <LegendImage src={bioretentionIcon} alt="Bioretention" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Bioretention
    </StyledButton>
  )}
</LegendItem>


<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('porousIcon')} 
      isSelected={selectedFeatures.includes('porousIcon')} 
    >
      <LegendImage src={rainIcon} alt="Porous" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Porous
    </StyledButton>
  )}
</LegendItem>


<LegendItem>
  {icons && (
    <StyledButton
      onClick={() => handleFeatureClick('treeIcon')} 
      isSelected={selectedFeatures.includes('treeIcon')} 
    >
      <LegendImage src={rainIcon} alt="Tree" style={{ width: '20px', height: '20px', justifyContent: 'center' }} />
      Tree
    </StyledButton>
  )}
</LegendItem>

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
  </MapLegendContainer>
  </Collapse>
 <MapLegendToggleContainer>
  <ToggleButton onClick={toggleShowLegend}>
        {isVisible ? <CaretDownStyled /> : <CaretUpStyled />}
      </ToggleButton>
  </MapLegendToggleContainer>
  </>
  );
};



export default MapLegend;

