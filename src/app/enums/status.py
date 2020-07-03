from enum import Enum


class Color(Enum):
    CANCELED = 0
    APPLY = 1
    APPLY_CONFIRMED = 2
    ACCEPTING_ORDER = 3
    FAILED_ORDER = 4
