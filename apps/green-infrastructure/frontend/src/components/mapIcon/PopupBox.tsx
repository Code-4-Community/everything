export function createPopupBoxContent(name?: string, location?: string, status?: string, type?: string) {
    return `
        <div>
        ${name ? `<p>Name: ${name}</p>` : ''}
        ${location ? `<p>Location: ${location}</p>` : ''}
        ${status ? `<p>Status: ${status}</p>` : ''}
        ${type ? `<p>Type: ${type}</p>` : ''}
        <a href="https://ma.adopt-a-drain.org/register?selectedDrainId=1084">Click here to adopt!</a>
        </div>
    `;
}