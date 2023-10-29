export function createPopupBoxContent(name: string, location: string, status: string, type: string, color: string, svgFunction: (color: string) => string) {

  return `
  <head><link rel='stylesheet'/></head>
  <body>
    <div class='popup'>
      <div class='typeBox'>
        ${type ? 
          `${svgFunction(color)}
          <p class='featureType'>Feature Type: </p><p><b>${type.toUpperCase()}</b></p>` 
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
