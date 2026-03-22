---
title: ACID properties in DBMS
---

#### Date: May 19, 2024

---
NoSQL databases are non-relational database systems that store and manage data using flexible schemas and alternative data models (key-value, document, column-family, graph, etc.) designed for horizontal scalability and high availability, especially for large-scale and distributed applications.” 

NoSQL database : non-relational database that stores the data in non tabular format, rather than in rule-based. It is build for scaling and distribution.

#### Characteristics of NoSQL database and SQL database

| **Aspect**  | **SQL**  | **NoSQL**  |
| --- | --- | --- |
| Schema  | Fixed - define structure first | Flexible - structure evolves freely  |
| Scaling  | Vertical - buy a bigger server | Horizontal - add more servers |
| Consistency  | ACID - always perfectly consistence  | BASE - eventually consistent |
| Best for  | Banking, inventory, structured data  | Social media, IoT, big data, AI |

#### ACID properties in DBMS

Relational databases live and die by **ACID** properties to ensure absolute accuracy. However, distributed web systems often require a more fluid philosophy known as **BASE**.

1. A ( Atomicity ) - [All or nothing] treats a transaction as a single unit. If any part of the transaction fails, the entire transaction fails and the database in unchanged ( rollback )
2. C ( Consistency ) - [ rule always hold ] the data must go from one valid state to another state. It always maintain all predefined rules , constrains and cascades. 
3. I ( Isolation ) - [ ops don’t interfere ] ensure that concurrently executing transactions do not interfere with each other. Each transactions behaves as if it is the only one running. 
4. D ( Durability ) - [committed / durability ] once the transaction is committed the data is saved permanently even surviving the system failure.

- Analogy :  surgeon in an operating room. Every step is logged. If something goes wrong, they rollback. The operation is either fully complete or doesn’t.

#### The Breakdown of BASE

- B ( Basically Available ) - [ always responds ] the system guarantees availability that respond to request ( read/ write ). but the responds might not reflect the most recent data
- S ( Soft state ) - ( data is in flux ) the state of the system may change over time , even without the new input because of eventual consistency meaning nodes in the distributed system may be in the process of syncing and the state in not fixed in any given moment.
- E ( Eventually consistent ) - [ will sync up ] the system doesn’t guarantee that all the nodes reflect the same data at the same time, but given enough time it will sync up.
- Analogy : Real-World Example of "Eventual Consistency"

You post a photo on Instagram. Your friend in Tokyo immediately tries to like it but they see an old version for 200 milliseconds. Then **both servers sync up** and everything is consistent. You never noticed. The ocean settled. This is BASE in action — and it's fine for social media. Would you want this for your bank account? Absolutely not. That's why banks use ACID.

#### CAP theorem ( pick any two) 

![alt text](/assets/cap.png)

- C - **What you see is always up-to-date.**
- A - **You always get an answer.**
- P - **this is non-negotiable** , networks always fail sometimes.
- **The Punchline:** Since P is always required in distributed systems, your real choice is:

**CP** (sacrifice availability during outages) vs **AP** (sacrifice consistency, but always respond)

In practice, **Partition Tolerance (P) is non-negotiable.** Networks will fail. Therefore, architects must choose between **CP systems** (Consistency + Partition Tolerance), which block operations during a failure to ensure accuracy, and **AP systems** (Availability + Partition Tolerance), which stay online but serve "stale" data.

To solve this "brutal" trade-off, modern NoSQL systems offer **tunable consistency**.
This allows developers to decide, on a per-operation basis, whether a  specific request needs the speed of availability or the precision of consistency.

#### Types of NoSQL Databases

- **Key-Value Stores** - Stores data as **key → value** pairs. Values are opaque blobs. Fastest possible lookups but zero rich querying.
- **Document Store -** Stores nested **JSON/BSON documents** in collections. Rich field-level queries. Flexible schema per document.
- **Column-Family Store -** Rows with **variable columns** grouped into "families." Query-driven design. Handles planetary scale writes.
- **Graph Database -** Stores data as **nodes + edges** with properties. Traversing relationships is a first class operation.
- **Time-Series DB -** Optimized for **timestamped metrics**. Handles extreme write throughput and time window queries efficiently
- **Vector Database -** Stores **AI embeddings** as high-dimensional vectors. Answers "what is most similar to X?" via mathematical distance.

