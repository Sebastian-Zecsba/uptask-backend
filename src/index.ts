import colors from 'colors'
import server from './server'

const port = process.env.port || 4000

server.listen(port, () => {
    console.log(colors.cyan.bold('Rest api funcionando en el ' + port) )
})