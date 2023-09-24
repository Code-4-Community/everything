import generateCircleSVG from '../../images/markers/circle';
import generateSquareSVG from '../../images/markers/square';
import generateDiamondSVG from '../../images/markers/diamond';
import generateTriangleSVG from '../../images/markers/triangle';
import generateStarSVG from '../../images/markers/star';

export function createPopupBoxContent(name?: string, location?: string, status?: string, type?: string, color?: string) {

  return `
  <head><link rel='stylesheet' href='style.css'/></head>
  <body>
    <div class='popup'>
      <div class='typeBox'>
        ${type ? 
          `${generateCircleSVG("green")}
          <p>Feature Type: </p><p><b>${type.toUpperCase()}</b></p>` 
          : ''}
      </div>
      <div class='infoBox'>
        ${name ? `<p><b>Name: </b>${name}</p>` : ''}
        ${location ? `<p><b>Location: </b>${location}</p>` : ''}
        ${status ? `<p><b>Status: </b>${status}</p>` : ''}
        <a href="https://ma.adopt-a-drain.org/register?selectedDrainId=1084">Click here to adopt!</a>
      </div>
    </div>
    </body>
    `;
}
