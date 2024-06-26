const { request, response } = require('express');
const { authenticate } = require('ldap-authentication')

async function auth( username, password ) {
  // auth with admin
  const options = {
    ldapOpts: {
      url: `ldap://${process.env.LDAP_HOSTNAME}`,
      // tlsOptions: { rejectUnauthorized: false }
    },
    adminDn: process.env.LDAP_SEARCH_BIND_DN,
    adminPassword: process.env.LDAP_SEARCH_BIND_PASSSWORD,
    userPassword: password,
    userSearchBase: process.env.LDAP_USER_BASE_DN,
    usernameAttribute: process.env.LDAP_USERNAME_ATTRIBUTE,
    username: username,
    attributes: ['dn', 'givenName', 'sn', 'sAMAccountName', 'mail', 'telephoneNumber', 'title', 'company', 'description', 'department', 'streetAddress', 'postalCode' ]
    
    // starttls: false
  }
// console.log( options )
  const user = await authenticate(options)
  return user;
}


const login  = async (req = request, res = response ) => {
    const solicitud = req.body;
    try{
// console.log(solicitud);
      const user = await auth(solicitud.username, solicitud.password );
      // const user = { 
      //   givenName: 'Adolfo',
      //   sn: 'López Escribano',
      //   sAMAccountName: 'alopeze',
      //   mail: 'adolfo.lopez@aguasdealicante.es'
      // }; 
console.log(  JSON.stringify(user) );
      res.render('main', user );
    } catch( e ) {
// console.error( e );
        res.status(401).send( { status: 401, errors: [ {msg: e.lde_message} ] } );
    }
}

module.exports = {
    login
}
