/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class TransacaoContract extends Contract {

    async transacaoExists(ctx, transacaoId) {
        const buffer = await ctx.stub.getState(transacaoId);
        return (!!buffer && buffer.length > 0);
    }

    async createTransacao(ctx, transacaoId, value) {
        const exists = await this.transacaoExists(ctx, transacaoId);
        if (exists) {
            throw new Error(`The transacao ${transacaoId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(transacaoId, buffer);
    }

    async readTransacao(ctx, transacaoId) {
        const exists = await this.transacaoExists(ctx, transacaoId);
        if (!exists) {
            throw new Error(`The transacao ${transacaoId} does not exist`);
        }
        const buffer = await ctx.stub.getState(transacaoId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateTransacao(ctx, transacaoId, newValue) {
        const exists = await this.transacaoExists(ctx, transacaoId);
        if (!exists) {
            throw new Error(`The transacao ${transacaoId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(transacaoId, buffer);
    }

    async deleteTransacao(ctx, transacaoId) {
        const exists = await this.transacaoExists(ctx, transacaoId);
        if (!exists) {
            throw new Error(`The transacao ${transacaoId} does not exist`);
        }
        await ctx.stub.deleteState(transacaoId);
    }

}

module.exports = TransacaoContract;
