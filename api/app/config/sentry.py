import sentry_sdk


def setup_sentry():
    sentry_sdk.init(
        dsn="https://254d89f0cd9f40e5bd0bf0c8b18a78d8@o4506822387171328.ingest.sentry.io/4506822388875264",
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        traces_sample_rate=1.0,
        # Set profiles_sample_rate to 1.0 to profile 100%
        # of sampled transactions.
        # We recommend adjusting this value in production.
        profiles_sample_rate=1.0,
    )
