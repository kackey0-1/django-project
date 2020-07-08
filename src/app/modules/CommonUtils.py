def divide_list(l=[], n=1000):
    """1000件ごとのリストのリストに変換"""
    divided_list = []
    for index in range(0, len(l), n):
        divided_list.append(l[index:index + n])
    return divided_list


if __name__ == '__main__':
    l = [1, 4, 2, 3, 10, 19, 1]
    print(l)
    print(divide_list(l=l, n=2))
