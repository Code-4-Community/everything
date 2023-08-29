import styled from 'styled-components';
import { Button, Typography, Image } from 'antd';
import { useState } from 'react';
import { SITE_OPTIONS_ROADMAP } from '../../constants';


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
`;

const LegendImage = styled(Image)`
  height: 20px;
  width: 20px;
  display: inline-block;
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

    const [availableIcon, adoptedIcon, futureIcon] =
      icons ?? SITE_OPTIONS_ROADMAP.map((option) => option.image);


    return (
        <MapLegendContainer>
            <h1>Feature Type</h1>
            <LegendItem>
                      <LegendImage src={availableIcon} preview={false} />
            </LegendItem>
            <LegendItem>
                      <LegendImage src={adoptedIcon} preview={false} />
            </LegendItem>
            <LegendItem>
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