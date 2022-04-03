export function showAddress(ele: any) {
  const address = ele[0].line[0] + " " + ele[0].city + " " + ele[0].state;
  return address;
}

export function showName(ele: any) {
  const firstName = ele[0].given[0].replace(/[0-9]/g, "");
  const lastName = ele[0].family.replace(/[0-9]/g, "");
  const name = firstName + " " + lastName;
  return name;
};

export function showMobile(ele: any) {
  const mobile = ele[0].value;
  return mobile;
};

