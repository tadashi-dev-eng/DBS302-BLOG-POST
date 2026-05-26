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


