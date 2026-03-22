---
title: "Unit 2: Redis Architecture"
---

Redis is an in-memory data structure store with single-threaded event loop architecture, persistence options, and replication.

This unit explores memory, commands, and high-availability.

#### 3 Pillars of Redis

1. In-memory storage (RAM) : Lives in RAM, not disk (HDD/SSD). Sub-millisecond access because memory reads are orders of magnitude faster.
2. Non-blocking I/O (Multiplexing): Reactor Pattern + epoll/kqueue. Handles thousands of concurrent connections without multi-threading.
3. Single-threaded execution (Atomic) : No context switching, no mutex locking, no race conditions. One command at a time — CPU cache stays warm.

```
Note

Multi-threaded DBs (MySQL) waste time context-switching and waiting on locks. Redis sidesteps this entirely — concurrency is managed by a queue, not locks. Result: millions of ops/sec.
```

```
RESP — Redis Serialization Protocol

Binary-safe, text-based protocol used by all Redis clients (Java, Python, Node.js, Go) to communicate with the server. The Reactor Pattern handles connections; RESP is the language spoken over them.
```

