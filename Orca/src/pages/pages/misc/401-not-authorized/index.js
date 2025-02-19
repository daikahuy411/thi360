// ** Component Import
import Error401 from 'pages/401'

// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'

const Error = () => <Error401 />
Error.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error
