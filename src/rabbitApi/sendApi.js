#!/usr/bin/env node

import uuid from 'uuid/v4';
import amqp from 'amqplib/callback_api'
import rabbitConnection from '../../index'


export default class RabbitQP {
    constructor(url){
        this.channel = '';
        this.url = url;
    }
    createConnection () {
        return amqp.connect(this.url, async (error, connection) => {
            if(error){
                // console for now will add an error management helper
                console.log(error)
            }
            connection.on('error', (err) => {

                console.error('An error occured.', err.message)
            })
            connection.on('close', () => {
                console.log('this connection has been closed')
            })
            await this.createsChannel(connection)

        })
    }

    closeConnection(connection){
        connection.close();
        process.exit()
    }

    async createsChannel(connection) {
        return await connection.createChannel(async (error, channel) => {
                if(error){
                    // console for now,I will add an error management helper
                    console.log(error)
                }
                console.log('yaaaaa')

                await this.createExchange(channel)
                console.log('Exchange chatto-app create')
                return channel
        })
    }

    static startPublisher(connection, data){
        connection.createChannel((error, channel) => {
            if(error){
                // console for now,I will add an error management helper
                console.log(error)
            }
    })

    }

    static startworker(connection, data){
        const {} = data
        connection.createChannel((error, channel) => {
            if(error){
                // console for now,I will add an error management helper
                console.log(error)
            }
        })
    }

    async createExchange (channel) {
        this.channel = channel
        return await channel.assertExchange('chatto-app', 'direct', { durable: false })
    }

    publishExchange(exchange, routingKey, content){
        console.log('working')
        const uuidv4 = uuid();
        try{
            this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(content)), { persist: true, correlationId: uuidv4 })
        }catch(error){
            console.error('[AMPQ] error occured', error.message)
        }
    }
}

// RabbitQP.handleEvent({ exchange: 'jobs', routingKey: '', content: { msg: 'Great this works', task: 'publish' }})