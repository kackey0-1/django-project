from enum import Enum


class ApplicationStatus(Enum):
    CANCELED = 0
    APPLY = 1
    APPLY_CONFIRMED = 2
    ACCEPTING_ORDER = 3
    FAILED_ORDER = 4


class ProjectStatus(Enum):
    CANCELED = 0
    APPLY = 1
    APPLY_CONFIRMED = 2
    ACCEPTING_ORDER = 3
    FAILED_ORDER = 4
