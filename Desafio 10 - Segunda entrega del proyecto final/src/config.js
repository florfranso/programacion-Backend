export default {
    fileSystem: {
        path: './DB'
    },
    
    mongodb: {
        cnxStr: 'mongodb://localhost/ecommerce',
       // cnxStr: 'mongodb+srv://backend:<password>@cluster0.to2lrc7.mongodb.net/?retryWrites=true&w=majority'
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // serverSelectionTimeoutMS: 5000,
        }
        
    },

    firebase: {

        "type": "service_account",
        "project_id": "trabajo-backend-2ebce",
        "private_key_id": "32e2d4b50c45aae2fd0f50d1ca975d4f2cf3d4aa",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfbkcbSMDvpXNG\nY8VGQh3n2XrsImlAjstSE+Qkg4Tj4nlJgRj2+mTJL0N/WRUELl+1FIpxg/T1h8o4\nuzFoQxIkH1ILa89ZLLPP5XUkhI9CTDXFeo4igQDcgSGYHAv7nCpyX+eSfLM1maJz\noOk1QAi30bPuft6ngwaqxp4EVM+K7A4lGEPD/WAf08/mWNdNimM8otz+MEDGIVgd\nOEJFYNTz1gkH0Hy1P6cyZKKlqc7CXbIo9AaH7mstLG67aPrdDr2SXs9NUWrBrQav\nMR3ZWdSfxN++Hs/G38mi/owh0xGZG+URfKMtF/2PjjDgI2OPeS9PrzHQCDF3ZvcB\nGHEX9HHVAgMBAAECggEAJxAUkQ1S5ITTyT/h0pSZkjiZoyjNRBmYnJwuDnpBAbr4\nP7fHX6A7OIYBkj7H5PXd0lbdkvGjf9NNC3hmIycn1zzrU8wPCkjnJ72PZaqrFTHq\nDOA52h9kkCJ9kjDxCK2bQtnXue8e07e4c39OFJODb1KMtRdVw5JZfFdc2S/UiDNq\nOOQWawsgf1Z8d1FOtxOzCW6vNz7EE5JSfX/GmeoIdbBLmnCCZ78SFX0ATcVo8OTK\ndWK+r4knGWDloeL3hKe29Ie/JDh0NEYpoZVpSdstZk40E5Zvo00oD9K7MfhtAcXf\n8Gq0NOgNmRAczbK5Dz3lC5gg4ziUj5k5kNlQlUOnswKBgQDQmWHIGDuoXq3haOol\nw0F3LgtqRkwXKOJFEQC1L7Aarq5CZQo3PbVJ4dLAyAGqO3coGyC6tdxR29ZoCNIn\nAy6jE7mfVnJn6TAwBC5DvWQCiBq7+njD3FKzh6IrHe4TdoIYJ0rqlgWvuWgJiRG/\nzN7If/SNDMr9U914U30K/ZLNowKBgQDDqK0ADpvWV1QnEuIHztkK1xuB1UgsitWM\ndEtyLaqBBjm2+/zzB/dBgnwwBUdsQZ4paBDZjgOMjRTWFXLEQ9/vML740azfXI0a\nA5ialtbU+nS3szAE48E8tFmxPFZ1EpKA1uzYupZz/E32+RQI8vdPpZkDQ/P5bUyn\npEpY4qJKJwKBgCB0zQ8KHjYrTRi2b0Ai6ku14VbOy0YLOXGPnLGUUu1D4p84A2fm\n9Q8i0NzoAcJP8FFQLz59z2L5NpoHTVN+nkIHbqlJFRHv6Wx/KgemLypprOc0qJeo\n70E5yFS3GnTyynkhm/l2EDpwOazKI/XY1Y0Sw6UyqV7TLrFrJBiSrcXLAoGBAK5i\naQay/owUO4mz18cTwfhabkbSfEhO2TQc9p1mPCBRFyGTCAjn4aT+kocOPXEsLrZC\n7TmpzFn56EdCyI5K3IzICn2kC4rsZ0p3SA0IQaODMoID79l70N+08nf4CirACdlR\nNbmY2722cxqbNxMe0fOn6W+yogF+PCLyV91O6UxjAoGBAL1JELI45yV5r70TPdZf\nBHc2gNk/mo/WXetoyd4OsZL995oKeLng28QGZ/OvCjlHNddQ9m9r6hvjkvel9l2l\nc1CVwFP8vTyWgdJevfiIj8FZofqTUsTn120wF/yr6edUIv0bJjyRPvpyMX6knzIr\nZf8ojQC3WN0gsZQ6VVN3g19X\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-4yhwa@trabajo-backend-2ebce.iam.gserviceaccount.com",
        "client_id": "117709661688366774040",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4yhwa%40trabajo-backend-2ebce.iam.gserviceaccount.com"

    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: '../DB/ecommerce.sqlite',
        },
        useNullAsDefault: true
    },
    /*mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'coderhouse'
        }
    }*/
}