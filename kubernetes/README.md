# Kubernetes Manifests

This folder contains the manifests (yaml) needed to deploy the applications (client, server, and db).

## Features of deploying applications in Kubernetes

- Self Healing
- High Availability
- Rollout and Rollback

## Note

Any manifest have this attributes in common,

```
apiVersion:
kind:
metadata:

spec:
```

To get apiVersion,

```
kubectl api-resources | grep deployment
```

### Replicaset vs Deployment

- To automate the Rollout and Rollback features of Kubernetes, a kind of Deployment is used.
- ReplicaSet will be automatically created by the Deployment.
- ReplicaSet then creates the pod.
- ReplicaSet can be created alone without deployment, if Rollout and Rollback are not your concern.
