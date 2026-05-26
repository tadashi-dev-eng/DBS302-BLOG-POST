---
title: "Cassandra Basics"
---
- Cassandra is an open source NoSQL distributed database designed for handling large data across many servers with high availability with no single point of failure. 
- Cassandra is an open-source, distributed NoSQL database running on the Java Virtual Machine (JVM)
- It offers linear scalability , fault tolerance on cloud infastructure and uses Cassandra Query Language (CQL) for database operations.
  
## Benifits of using Cassandra : 
1. Free and open source, accessible to everyone
2. Easily scalable, fault tolerant and consistent.
3. Column oriented database.
4. Support for replicating across multiple datacenters and hybird cloud environment.
---
- Some history of cassandra is as below : 
1. It was developed at facebook for inbox search.
2. It was made open source by Facebook in july 2008.
3. Gradually it was accepted into apache incubator in March 2009.
4. Since Feburary 2010 it started to work on top level project. 
---
## Database Types and Use Cases
- NoSQL databases include column-family stores (like Cassandra), graph databases, and document stores.
- Relational databases (e.g., Oracle, MySQL) organize data in tables with relationships, suited for transaction-oriented applications.
- Cassandra excels in fast writes, scalability, and handling hundreds of terabytes of distributed data, making it ideal for large-scale web applications.
---

* The architecture of Cassandra is designed to be distributed, decentralized, and highly scalable. 
* Consistent hashing in Cassandra is a method used to distribute data across the nodes in a cluster efficiently. It works by assigning each piece of data a unique token based on a hash function, which places it on a logical ring. Each node in the cluster is responsible for a specific range of tokens on this ring.
* Consistent hashing in Cassandra plays a crucial role in distributing data evenly across the cluster and enabling smooth scalability.
---

## Database Scalability Challenges

- Relational databases scale well vertically by upgrading hardware on a single server but face limits when hardware cannot be further upgraded.
- Horizontal scaling across multiple servers is needed for massive workloads, which relational databases struggle to handle efficiently.

## NoSQL Databases and Their Advantages

- NoSQL databases use different data models like key-value, wide column, graph, or document stores to enable horizontal scaling.
- They are designed to handle large-scale data and high availability, making them suitable for companies like Facebook and Amazon.

## Trade-offs Between ACID and BASE Models

- Relational databases provide ACID guarantees: Atomicity, Consistency, Isolation, and Durability for reliable transactions.
- NoSQL databases follow the BASE model: Basically Available, Soft state, Eventual consistency, trading off strict consistency for scalability and speed.

## Types of Databases and NewSQL

- Databases can be relational, non-relational, operational, or analytics-focused, including traditional SQL and NoSQL types.
- NewSQL is a hybrid approach aiming to combine traditional RDBMS with web-scale efficiency, exemplified by systems like Google Spanner, though often proprietary and not fully SQL-compliant.

## Key-Value Stores and Column Families

- Key-value stores organize data as values accessed by unique keys, often using hashing.
- Column families group multiple key-value pairs into rows with timestamps, and Cassandra combines these concepts into partitions, nodes, and clusters.

## Cassandra Features and Architecture

- Cassandra is distributed and decentralized with a peer-to-peer architecture where all nodes are equal, avoiding single points of failure.
- It supports elastic scalability, allowing clusters to scale up or down without disruption, and offers high availability and fault tolerance by replicating data across nodes and data centers.
- Cassandra provides tunable eventual consistency, ensuring that all replicas become consistent over time.

- In Cassandra, the peer-to-peer architecture means that all nodes in the cluster are equal—there is no master or slave node. Each node:
    1. Has the same role and responsibilities.
    2. Communicates with other nodes as peers.
    3. Shares data and workload evenly.

- Data propagation and node status are managed through mechanisms like gossip and snitch protocols.
- Tunable eventual consistency in Cassandra means we can adjust how strict the consistency of data is across replicas when reading or writing.

## Cassandra Data Model and Storage

- Cassandra is row-oriented with data stored in columns as key-value pairs, allowing sparse data storage without allocating space for null values.
- It supports multicore and multithreading, uses multiple caches (integrated, distributed, partition key cache), compresses data on disk, and stores frequently accessed data in memory for faster access.

Performance Optimizations

- Partition key cache reduces seek time by storing partition indexes.
- Bloom filters prevent full table scans by enabling index scans based on data partitions.
- Memory access is significantly faster than disk access, improving read/write performance.

## Consistency and CAP Theorem

- The CAP theorem states a distributed database can only guarantee two of three properties: Consistency, Availability, and Partition tolerance.
- Cassandra prioritizes availability and partition tolerance, compromising on strict consistency.

- The CAP theorem in distributed databases states that it is impossible for a distributed data store to simultaneously guarantee all three of the following properties:

    1. Consistency: Every read receives the most recent write or an error.
    2. Availability: Every request receives a response, without guarantee that it contains the most recent write.
    3. Partition Tolerance: The system continues to operate despite network partitions or communication breakdowns between nodes.
   
- Eventual consistency in Cassandra means that after a write or update, the data will not be immediately consistent across all nodes, but over time, all replicas will converge to the same, up-to-date value.

## Types of Consistency

- Strict consistency ensures all reads/writes reflect the most recent data immediately.
- Casual consistency allows some delay in data synchronization across replicas.
- Eventual consistency, used by Cassandra, guarantees data will become consistent over time.
- Cassandra allows tuning consistency levels to balance performance and data accuracy.
---
1. The "Masterless" Miracle (True Decentralization)
- Traditional databases typically rely on a master-slave (or leader-follower) architecture. This creates an inherent bottleneck: one node to rule them all, and one node whose failure brings the system to its knees. Cassandra eliminates this by employing a peer-to-peer, decentralized model.
In a Cassandra cluster, all nodes are identical. There are no "special" nodes. Any node can act as a coordinator, receiving a request from a client and forwarding it to the appropriate replicas. To maintain this state, nodes use the Gossip Protocol—a peer-to-peer communication method where nodes share state information about themselves and their neighbors three times per second. This "secret language" allows the cluster to automatically detect failures and manage its own topology without human intervention.
"Any node in the database can provide the exact same functionality as any other node — contributing to Cassandra's robustness and resilience."
Because of this masterless design, Cassandra provides "continuous availability." If an entire data center goes dark, the remaining nodes in other regions continue to serve requests without a millisecond of manual failover.
---

2. Why Deleting Data is Actually a "Write" (The Tombstone Paradox)
- In a relational database, a DELETE command typically removes a row from a table. In Cassandra, a deletion is actually a special type of write called a Tombstone. To understand why, we have to look at the Write Path:

    1. Commit Log: Data is first written to a durable, append-only log on disk for crash recovery.
    2. Memtable: Data is then written to an in-memory structure.
    3. SSTable: Once the memtable is full, it is flushed to disk as a Sorted String Table.

Here is the "mind-bending" part: SSTables are immutable. Once written to disk, they are never modified. Because Cassandra cannot "reach into" a file on disk and erase a row without expensive I/O, it simply writes a "tombstone" marker in a new SSTable. This marker tells the system during a read that the older data is now invalid.
Disk space is only reclaimed later during Compaction, a background process that merges SSTables and finally discards the rows marked by tombstones. However, this creates a specific maintenance guardrail:
- The Partition Rule of Thumb: To keep compaction and reads efficient, you must manage your partition sizes. An ideal partition is under 10MB, and you should strictly avoid exceeding 100MB. Large "wide partitions" make tombstone eviction difficult, leading to memory pressure and performance degradation.
--- 

3. The "Choose Your Own Adventure" Consistency (CAP Theorem Hack)
- The CAP Theorem states that a distributed system can only provide two of three guarantees: Consistency, Availability, and Partition Tolerance. As a distributed system, Cassandra prioritizes being an AP system (Available and Partition-tolerant). It is "always on," even if network issues prevent nodes from communicating.
However, Cassandra offers Tunable Consistency. The Coordinator node manages this logic on a per-query basis using the formula R + W > N (where R is the read replicas, W is the write replicas, and N is the total replication factor). If you need strong consistency, you use QUORUM (defined as RF/2 + 1).
Eventual Consistency
---

