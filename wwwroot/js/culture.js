export function setCulture(culture) {
    localStorage.setItem('PortfolioCulture', culture);
    location.reload();
}