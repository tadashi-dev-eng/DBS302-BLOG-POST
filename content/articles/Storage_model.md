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