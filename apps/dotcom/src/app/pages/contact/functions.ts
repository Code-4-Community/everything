// DEMO NOTE: this function is just to mock an actual API request
// In reality there would be some logic and a call to another service
// but for the sake of demonstration, this just prints any given parameters

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function submitFormData(...parameters) {
    return new Promise((resolve, reject) => {
        console.log(parameters);
        resolve(0);
    });
}
