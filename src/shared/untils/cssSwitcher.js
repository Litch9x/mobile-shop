// utils/cssSwitcher.js
/**
 * @param {{ enable: string[], disable: string[] }} param0
 */
export const toggleStylesheets = ({ enable = [], disable = [] }) => {
  enable.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = false;
  });

  disable.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
};
