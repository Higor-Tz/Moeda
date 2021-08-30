/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { TransacaoContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('TransacaoContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new TransacaoContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"transacao 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"transacao 1002 value"}'));
    });

    describe('#transacaoExists', () => {

        it('should return true for a transacao', async () => {
            await contract.transacaoExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a transacao that does not exist', async () => {
            await contract.transacaoExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createTransacao', () => {

        it('should create a transacao', async () => {
            await contract.createTransacao(ctx, '1003', 'transacao 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"transacao 1003 value"}'));
        });

        it('should throw an error for a transacao that already exists', async () => {
            await contract.createTransacao(ctx, '1001', 'myvalue').should.be.rejectedWith(/The transacao 1001 already exists/);
        });

    });

    describe('#readTransacao', () => {

        it('should return a transacao', async () => {
            await contract.readTransacao(ctx, '1001').should.eventually.deep.equal({ value: 'transacao 1001 value' });
        });

        it('should throw an error for a transacao that does not exist', async () => {
            await contract.readTransacao(ctx, '1003').should.be.rejectedWith(/The transacao 1003 does not exist/);
        });

    });

    describe('#updateTransacao', () => {

        it('should update a transacao', async () => {
            await contract.updateTransacao(ctx, '1001', 'transacao 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"transacao 1001 new value"}'));
        });

        it('should throw an error for a transacao that does not exist', async () => {
            await contract.updateTransacao(ctx, '1003', 'transacao 1003 new value').should.be.rejectedWith(/The transacao 1003 does not exist/);
        });

    });

    describe('#deleteTransacao', () => {

        it('should delete a transacao', async () => {
            await contract.deleteTransacao(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a transacao that does not exist', async () => {
            await contract.deleteTransacao(ctx, '1003').should.be.rejectedWith(/The transacao 1003 does not exist/);
        });

    });

});
