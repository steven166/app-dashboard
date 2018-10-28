export const applicationData = {
  mcms: {
    builds: {
      jenkins: {
        description: 'Build server',
        color: 'red',
        image: '/assets/apps/jenkins.png',
        url: 'https://jenkins-mcms.maxxton.com'
      },
      nexus: {
        description: 'Artifact Repository',
        color: 'green',
        image: '/assets/apps/nexus.png',
        url: 'https://nexus-mcms.maxxton.com'
      }
    },
    production: {
      kubernetes: {
        description: 'Container Platform',
        color: 'blue',
        image: '/assets/apps/kubernetes.png',
        url: 'https://kube-mcms01.maxxton.com/#!/overview?namespace=mcms-prod',
        square: true
      },
      mongodb: {
        description: 'CMS Database',
        color: 'green',
        image: '/assets/apps/mongodb.png',
        url: 'https://mongo-prod-mcms01.maxxton.com',
        whiteBackground: true
      },
      'stackdriver logging': {
        description: 'Application Logs',
        color: 'pink',
        image: '/assets/apps/gcp.png',
        url: 'https://console.cloud.google.com/logs/viewer?project=maxxton-mcms&resource=container%2Fcluster_name%2Flmcms01%2Fnamespace_id%2Fmcms-prod'
      },
      'stackdriver traces': {
        description: 'Application Performance Metrics',
        color: 'teal',
        image: '/assets/apps/gcp.png',
        url: 'https://console.cloud.google.com/traces/traces?project=maxxton-mcms'
      },
      redis: {
        description: 'InMemory Cache',
        color: 'red',
        image: '/assets/apps/redis.png',
        url: 'https://redis-prod-mcms01.maxxton.com'
      },
      grafana: {
        description: 'Metrics Dashboard',
        color: 'orange',
        image: '/assets/apps/grafana.svg',
        url: 'https://grafana.maxxton.com',
        square: true
      },
      prometheus: {
        description: 'Metrics Database',
        color: 'red',
        image: '/assets/apps/prometheus.png',
        url: 'https://prometheus-mcms01.maxxton.com'
      },
      alerts: {
        description: 'Alert Manager',
        color: 'red',
        image: '/assets/apps/prometheus.png',
        url: 'https://alerts-mcms01.maxxton.com'
      }
    },
    acceptance: {
      kubernetes: {
        description: 'Container Platform',
        color: 'blue',
        image: '/assets/apps/kubernetes.png',
        url: 'https://kube-mcms01.maxxton.com/#!/overview?namespace=mcms-acc',
        square: true
      },
      mongodb: {
        description: 'CMS Database',
        color: 'green',
        image: '/assets/apps/mongodb.png',
        url: 'https://mongo-acc-mcms01.maxxton.com',
        whiteBackground: true
      },
      'stackdriver logging': {
        description: 'Application Logs',
        color: 'pink',
        image: '/assets/apps/gcp.png',
        url: 'https://console.cloud.google.com/logs/viewer?project=maxxton-mcms&resource=container%2Fcluster_name%2Flmcms01%2Fnamespace_id%2Fmcms-acc'
      },
      'stackdriver traces': {
        description: 'Application Performance Metrics',
        color: 'teal',
        image: '/assets/apps/gcp.png',
        url: 'https://console.cloud.google.com/traces/traces?project=maxxton-mcms'
      },
      redis: {
        description: 'InMemory Cache',
        color: 'red',
        image: '/assets/apps/redis.png',
        url: 'https://redis-acc-mcms01.maxxton.com'
      },
      grafana: {
        description: 'Metrics Dashboard',
        color: 'orange',
        image: '/assets/apps/grafana.svg',
        url: 'https://grafana.maxxton.com',
        square: true
      },
      prometheus: {
        description: 'Metrics Database',
        color: 'red',
        image: '/assets/apps/prometheus.png',
        url: 'https://prometheus-mcms01.maxxton.com'
      },
      alerts: {
        description: 'Alert Manager',
        color: 'red',
        image: '/assets/apps/prometheus.png',
        url: 'https://alerts-mcms01.maxxton.com'
      }
    },
    development: {
      openshift: {
        description: 'Container Platform',
        color: 'red',
        image: '/assets/apps/openshift.png',
        url: 'https://openshift.maxxton.com:8443/projects/mcms',
        square: true
      },
      grafana: {
        description: 'Metrics Dashboard',
        color: 'orange',
        image: '/assets/apps/grafana.svg',
        url: 'https://grafana-dev.maxxton.com',
        square: true
      },
      prometheus: {
        description: 'Metrics Database',
        color: 'red',
        image: '/assets/apps/prometheus.png',
        url: 'https://prometheus-dev.maxxton.com'
      },
      alerts: {
        description: 'Alert Manager',
        color: 'red',
        image: '/assets/apps/prometheus.png',
        url: 'https://alerts-dev.maxxton.com'
      }
    }
  },
  admin: {}
};
