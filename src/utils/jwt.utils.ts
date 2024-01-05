import jwt from 'jsonwebtoken'
const private_key = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAKjeS5tahVTPDHf15n1A2AYm2kEfzXo1TKl5U11iZ2yBftKdnWG1
9HMn/yJaWXwYIa2vxyFpwQhQKdobeNQCcikCAwEAAQJAD9ApMlYKsENnPoCHYelF
kWXoADszKaN+F0ymMtN5Ld7Xburl0mBqrTZD3Z4AGCcluqvY6DC3z/NP1w47MsPc
0QIhAN+6R6RJsPZBqFzz5cLakZ2jXBlahZLzWucHucHonorFAiEAwToxpp0JPt2n
zRGNllUi/ZpiNoO0lYFTizjphn1N0BUCIQC+5qNU4vBV4EZ6Mj8eGgRgf1EJ7TzG
3FH3ipcNh6EohQIgbCt3wB4JHvhXB6Xb7VybyfyzHnF8lnVfn4Csum1LMkECIBFH
9kaJxuOFGyGGKXQtJKkTfl9ZPEEmq39N2xZ4IOv7
-----END RSA PRIVATE KEY-----
`;

const public_key = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKjeS5tahVTPDHf15n1A2AYm2kEfzXo1
TKl5U11iZ2yBftKdnWG19HMn/yJaWXwYIa2vxyFpwQhQKdobeNQCcikCAwEAAQ==
-----END PUBLIC KEY-----
`;

export function signJwt (payload:object ,expiresIn:string | number){
    return jwt.sign(payload, private_key , {algorithm:"RS256" , expiresIn});
}

export function verifyJwt(token:string){
    try {
        const decoded = jwt.verify(token , public_key);
        return {payload : decoded , expired:false}
        
    } catch (error) {
        return {expired:error.message.include("jwt expired")}
        
    }
}