# Development of the U$P Currency Prototype

## Introduction:
The project carried out is part of the creation of an “artificial microeconomics” within USP, proposed by Nação USP Empreendedora, with the aim of generating, through research applied to industry, new products and services.
For this purpose, the research and manipulation of the Distributed Ledger Technology (DLT) was proposed, Hyperledger Fabric, a platform of permissioned blockchain in which users have greater control of transactions on the network than on blockchains such as Ethereum.

## Description:
The objective of the project proposed by Nação USP Empreendedora is to create an endowment fund that finances innovations within the campus through the creation of a cryptocurrency, managing the transactions of its funds, using a web platform for the integration of financial services in the USP community.
Through this proposal, the objectives of this project are the development of research, studies and applications of transactions using blockchains, creating a network infrastructure for Digital Currency, where transactions can take place between participating users.

## Blockchain:
According to The Linux Foundation, the blockchain is a subset of distributed ledger technologies that builds a chronological chain of blocks, in which each block has a set of transactions grouped together.
Different from the client-server model, in which there is a centralized database that receives requests from all users, in the blockchain, the system is distributed in several machines simultaneously, arranged in a Peer-To-Peer (P2P) network. Each stores a unanimous version of the block chain, decentralizing transaction management.
A permissioned blockchain must guarantee response time and require a high level of service quality on the communication links. All parties joining the network are authenticated and authorized to participate in the network; however, there is a restriction on who is authorized to enter and carry out transactions on the network, thus making it possible to know who the authors are and their actions in the system.

## Hyperledger Fabric:
Developed by the Linux Foundation, Hyperledger Fabric is an open source platform designed to advance blockchain technologies across multiple industries. Within the group of collaborators are included industry leaders in technology, finance, banking, supply chain management, manufacturing and IoT who develop several solutions for Distributed Ledger Technology.
The goal of Hyperledger Fabric is to create enterprise-level, open source accounting frameworks and distributed code bases to support business use cases, providing all the features of the blockchain architecture for enterprises, such as information sharing and immutability through a complete stack of security protocols.

## Dependencies:
 - *Visual Studio Code*
 - *IBM Blockchain Plataform*
 - *Docker*
 - *Docker Compose*
 - *Postman*

The IBM Blockchain Platform extension of Visual Studio Code was used to create networks, contracts, identity cards and make manipulations on the network. For this it is necessary to install components that are prerequisites for running Hyperledger Fabric: Docker, Docker Compose and other components.
After creating a network named "MoedaU$P", using the IBM platform, the "Transacao" contract was created available in this document.
While the documents in the "API-Postman" folder refer to the API developed to execute the "Transacao" contract methods created via API in the Postman interface, the api codes were adapted and formatted from the "api-dicom" developed by eriksonJAguiar available at the link to follow:

https://github.com/eriksonJAguiar/Blockchain-Token-DICOM/tree/master/api-dicom

Note: The folder "node_modules", referring to the Fabric binaries in GO language, are not found inside the server folder as in the eriksonJAguiar repository from the link above, if you are interested in executing the method calls via API it is necessary to move a copy folder "node_modules" that was installed on your local machine to this folder, this folder is generated in the installation dependencies of Fabric, if it is not on your computer you can download by the link above.

## Results:
This project, carried out by Higor Tessari in 2021, belongs to a series of ongoing studies for the application of this microeconomics in the academic environment of the University of São Paulo (USP).
