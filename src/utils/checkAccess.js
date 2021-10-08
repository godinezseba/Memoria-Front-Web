export function checkAccess(access, user) {
  const { data: { isAdmin, companyType } = {} } = user || {};

  return (access === 4 && isAdmin)
    || (companyType === 'certifier' && access <= 3)
    || (companyType === 'company' && access <= 2)
    || access === 1;
}
