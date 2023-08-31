import styled from 'styled-components';
import { Button, Typography, Image, Checkbox } from 'antd';
import { useState } from 'react';
import { SITE_STATUS_ROADMAP, SITE_TYPE_ROADMAP } from '../../constants';


const MapLegendContainer = styled.div`
  background: #BDBDBD;
  width: 435px;
  height: 419px;
  left: 845px;
  gap: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: right;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  margin-bottom: 0;
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
  float: left;
`;

// const ToggleTextButton = styled(Button)`
//   padding: 5px;
// `;


interface MapLegendProps {
    readonly canHide?: boolean;
    readonly icons?: string[];
  }

const MapLegend: React.FC<MapLegendProps> = ({ canHide, icons }) => {
    // const [showLegend, setShowLegend] = useState(true);

    // const toggleShowLegend = () => {
    //     setShowLegend((prevState) => !prevState);
    //   };

    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

    const handleCheckboxChange = (icon: string) => {
        setSelectedCheckboxes(prevSelected => {
          if (prevSelected.includes(icon)) {
            return prevSelected.filter(selected => selected !== icon);
          } else {
            return [...prevSelected, icon];
          }
        });
      };


    const [availableIcon, adoptedIcon, futureIcon] =
      icons ?? SITE_STATUS_ROADMAP.map((option) => option.image);


    return (
        <MapLegendContainer>
            <h1>Feature Type</h1>
            <LegendItem>
        <CheckboxContainer>
          <Checkbox
            checked={selectedCheckboxes.includes(availableIcon)}
            onChange={() => handleCheckboxChange(availableIcon)}
          />
          <CheckboxLabel>Available</CheckboxLabel>
        </CheckboxContainer>
        <LegendImage src={availableIcon} preview={false} />
      </LegendItem>
      <LegendItem>
        <CheckboxContainer>
          <Checkbox
            checked={selectedCheckboxes.includes(adoptedIcon)}
            onChange={() => handleCheckboxChange(adoptedIcon)}
          />
          <CheckboxLabel>Adopted</CheckboxLabel>
        </CheckboxContainer>
        <LegendImage src={adoptedIcon} preview={false} />
      </LegendItem>
      <LegendItem>
        <CheckboxContainer>
          <Checkbox
            checked={selectedCheckboxes.includes(futureIcon)}
            onChange={() => handleCheckboxChange(futureIcon)}
          />
          <CheckboxLabel>Future</CheckboxLabel>
        </CheckboxContainer>
        <LegendImage src={futureIcon} preview={false} />
      </LegendItem>

            {/* {canHide && (
        <ToggleTextButton type={'link'} onClick={toggleShowLegend}>
          {showLegend ? 'Hide Legend' : 'Show Legend'}
        </ToggleTextButton>
      )} */}
        </MapLegendContainer>
      );
    };


export default MapLegend;