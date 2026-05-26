---
title: Cassandra Storage model 
---

### Cassandra Data Model

- Combines key-value store and column family system with flexible schema and unstructured data.
- Data is organized into keyspaces (like databases), tables, partitions (rows sharing a partition key), and columns (entities).

### Data Storage and Write Path

- Writes are logged in a commit log (for durability) and stored in memtables (in-memory) before being flushed to immutable SSTables on disk.
- SSTables are sorted string tables that store data permanently; updates are handled as upserts.
- Memtables provide high performance; commit logs enable recovery after crashes.

### SSTable Structure and Indexing

- SSTables include data files, primary indexes, statistics, compression info, secondary indexes, index summaries, and Bloom filters.
- Bloom filters help quickly check if data exists in memtables before disk access.

### Consistency Levels in Cassandra

- Tunable consistency allows control over how many replica nodes must acknowledge writes or reads.
- Levels range from ANY (lowest durability) to ALL (highest consistency but lower availability).
- "One" consistency level ensures durability by writing to commit log and memtable on at least one node before confirming success.

### Write Path and Consistency

- A client sends a write request to a coordinator node, which identifies replica nodes based on the replication factor and sends the write to all replicas.
- The write consistency level determines success; for example, with consistency level one, the write is successful if one replica confirms the write.

- The coordinator node in Cassandra's write path acts as the central point that receives the client's write request. Its roles include:

    1. Using the partitioner to identify which nodes are replicas for the data based on the replication factor.
    2. Sending the write request to all replica nodes regardless of the consistency level.
    3. Collecting responses from replicas to determine if the write meets the configured consistency level.
    4. Confirming the success or failure of the write back to the client based on the consistency level criteria.

- The write consistency level in Cassandra specifies how many replica nodes must acknowledge a write for it to be considered successful. It determines the level of data consistency and durability you require for a write operation.
- 
### Handling Write Issues and Repairs

- Issues during writes include unavailable nodes, timeouts, and hardware failures.
- Hinted handoff stores hints for unavailable nodes to replay writes later; read repair and write repair automatically ensure data consistency, while anti-entropy node repair is a manual maintenance process.

### Replica Node Write Operations and Multi-Data Center Setup

- Each replica appends to the commit log, updates the memtable, checks cache, flushes to disk if needed, and processes saved hints.
- In multi-data center clusters, the coordinator contacts replicas across data centers to meet consistency requirements like quorum.

### Limitations and Overheads

- Cassandra lacks traditional transactions, rollback, and locking, though it supports expensive lightweight transactions.
- Updates and deletes are resource-intensive; deletes create tombstones that mark data for deletion during compaction rather than immediate removal.

### Types of Read Requests

- Direct read requests involve the coordinator node contacting a single replica node.
- Digest requests involve the coordinator sending a read request to the fastest replica and digest requests to others to verify data consistency.
- Background read repair requests are triggered if inconsistencies are detected during the read process.

### Read Consistency Levels

- Consistency levels include ONE, TWO, THREE, LOCAL_ONE, QUORUM, LOCAL_QUORUM, and ALL, defining how many replicas must respond and from which data centers.
- The coordinator ensures the latest data is returned and initiates repair requests if consistency requirements are not met.

### Read Path Workflow

- In a multi-data center setup, the coordinator sends read requests to replicas based on the consistency level, ensuring local data center responses when required.
- Replica nodes first check the row cache, then memtables, and finally SSTables to retrieve data.
- SSTable optimizations include Bloom filters to quickly check partition existence, key caches to locate data offsets, and indexes to efficiently access stored data.

### Performance Limitations and Query Design

- Cassandra does not support joins, so database design must be query-driven, anticipating the queries to be performed.
- Apache Spark can be used to perform joins externally if necessary.

### Indexes and Consistency

- Cassandra has a primary index (primary key) and limited secondary indexes, which should be used sparingly.
- The system uses eventual consistency, which can be tuned based on requirements.

### Data Deletion and Tombstones

- Unlike traditional RDBMS, deletes in Cassandra create tombstones (markers) instead of immediately removing data to handle distributed node states.
- Tombstones ensure that deleted data is eventually removed across all replicas, even if some nodes were down during deletion.
- In Cassandra, tombstones play a crucial role in the data deletion process by acting as markers for deleted data rather than immediately removing it. This approach is necessary because Cassandra is a distributed system with multiple nodes.

### Compaction and Grace Period

- Tombstones are kept for a configurable grace period (default 10 days) to allow propagation of deletions.
- After the grace period, compaction merges data, removes tombstones, and reclaims disk space.
- If a node is down longer than the grace period, data consistency issues may arise.

### Granularity of Deletion

- Cassandra supports deletion at multiple levels: individual collection items, non-primary key columns, entire rows, ranges of rows, or entire partitions.
